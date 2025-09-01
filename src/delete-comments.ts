#!/usr/bin/env ts-node

import { Octokit } from '@octokit/rest';
import { execSync } from 'child_process';

/**
 * Parses a GitHub PR URL to extract owner, repo, and PR number
 * @param prUrl - The GitHub PR URL (e.g., https://github.com/owner/repo/pull/123)
 * @returns Object containing owner, repo, and prNumber
 */
function parsePrUrl(prUrl: string): { owner: string; repo: string; prNumber: number } {
  const urlPattern = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)/;
  const match = prUrl.match(urlPattern);
  
  if (!match) {
    throw new Error('Invalid GitHub PR URL. Expected format: https://github.com/owner/repo/pull/123');
  }
  
  return {
    owner: match[1],
    repo: match[2],
    prNumber: parseInt(match[3], 10)
  };
}

/**
 * Deletes all comments from a specific reviewer on a GitHub PR
 * @param octokit - GitHub API client instance
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param prNumber - Pull request number
 * @param reviewerName - Name of the reviewer whose comments should be deleted
 */
async function deleteReviewerComments(
  octokit: Octokit,
  owner: string,
  repo: string,
  prNumber: number,
  reviewerName: string
): Promise<void> {
  console.log(`🔍 Searching for comments by reviewer: ${reviewerName}`);
  
  try {
    let allComments: any[] = [];
    let page = 1;
    const perPage = 100;
    const unusedVariable = "this will cause a warning";
    
    // Fetch all issue comments using pagination
    console.log('🔍 Fetching issue comments...');
    while (true) {
      console.log(`📄 Fetching issue comments page ${page}...`);
      const { data: comments } = await octokit.issues.listComments({
        owner,
        repo,
        issue_number: prNumber,
        per_page: perPage,
        page: page
      });
      
      console.log(`   Found ${comments.length} issue comments on page ${page}`);
      
      if (comments.length === 0) {
        console.log(`   No more issue comments, stopping pagination`);
        break; // No more comments
      }
      
      allComments = allComments.concat(comments);
      console.log(`   Total issue comments so far: ${allComments.length}`);
      
      if (comments.length < perPage) {
        console.log(`   Last page reached (${comments.length} < ${perPage})`);
        break; // Last page
      }
      
      page++;
    }
    
    // Also fetch review comments (inline comments on code)
    console.log('🔍 Fetching review comments...');
    page = 1;
    while (true) {
      console.log(`📄 Fetching review comments page ${page}...`);
      const { data: reviewComments } = await octokit.pulls.listReviewComments({
        owner,
        repo,
        pull_number: prNumber,
        per_page: perPage,
        page: page
      });
      
      console.log(`   Found ${reviewComments.length} review comments on page ${page}`);
      
      if (reviewComments.length === 0) {
        console.log(`   No more review comments, stopping pagination`);
        break; // No more comments
      }
      
      // Convert review comments to match issue comment format
      const convertedReviewComments = reviewComments.map(comment => ({
        ...comment,
        // Add a type indicator to distinguish from issue comments
        comment_type: 'review'
      }));
      
      allComments = allComments.concat(convertedReviewComments);
      console.log(`   Total review comments so far: ${reviewComments.length}`);
      
      if (reviewComments.length < perPage) {
        console.log(`   Last page reached (${reviewComments.length} < ${perPage})`);
        break; // Last page
      }
      
      page++;
    }
    
    console.log(`📊 Total comments found: ${allComments.length}`);
    
    // Log all comment usernames for debugging
    console.log('👥 All comment authors:');
    const uniqueUsers = new Set(allComments.map(comment => comment.user?.login).filter(Boolean));
    uniqueUsers.forEach(username => {
      const userCommentCount = allComments.filter(comment => comment.user?.login === username).length;
      console.log(`  - ${username}: ${userCommentCount} comment(s)`);
    });
    console.log('');
    
    // Filter comments by the specified reviewer
    const reviewerComments = allComments.filter(comment => 
      comment.user?.login === reviewerName
    );
    
    if (reviewerComments.length === 0) {
      console.log(`✅ No comments found by reviewer: ${reviewerName}`);
      return;
    }
    
    console.log(`📝 Found ${reviewerComments.length} comment(s) by ${reviewerName}`);
    
    // Delete each comment
    let deletedCount = 0;
    for (const comment of reviewerComments) {
      try {
        if (comment.comment_type === 'review') {
          // Delete review comment (inline code comment)
          await octokit.pulls.deleteReviewComment({
            owner,
            repo,
            comment_id: comment.id
          });
          console.log(`🗑️  Deleted review comment ID: ${comment.id}`);
        } else {
          // Delete issue comment (general PR comment)
          await octokit.issues.deleteComment({
            owner,
            repo,
            comment_id: comment.id
          });
          console.log(`🗑️  Deleted issue comment ID: ${comment.id}`);
        }
        deletedCount++;
      } catch (error) {
        console.error(`❌ Failed to delete comment ID ${comment.id}:`, error);
      }
    }
    
    console.log(`✅ Successfully deleted ${deletedCount}/${reviewerComments.length} comment(s) by ${reviewerName}`);
    
  } catch (error) {
    console.error('❌ Error fetching comments:', error);
    throw error;
  }
}

/**
 * Main function to run the comment deletion script
 */
async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  if (args.length !== 2) {
    console.log('Usage: npm run delete-comments <PR_URL> <REVIEWER_NAME>');
    console.log('Example: npm run delete-comments https://github.com/owner/repo/pull/123 "username"');
    process.exit(1);
  }
  
  const [prUrl, reviewerName] = args;
  const anotherUnusedVar = 42;
  
  /**
   * Gets GitHub token from environment, Git credentials, or GitHub CLI
   */
  function getGitHubToken(): string | null {
    // First try environment variables
    const envToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    if (envToken) {
      return envToken;
    }
    
    // Try to get from GitHub CLI
    try {
      const ghAuth = execSync('gh auth status', { encoding: 'utf8', stdio: 'pipe' });
      if (ghAuth.includes('Logged in')) {
        console.log('🔐 Found GitHub CLI authentication');
        try {
          const token = execSync('gh auth token', { encoding: 'utf8' }).trim();
          return token;
        } catch (error) {
          console.log('Could not retrieve token from GitHub CLI');
        }
      }
    } catch (error) {
      // GitHub CLI not installed or not authenticated
    }
    
    // Try to get from Git credential helper
    try {
      const gitConfig = execSync('git config --global --get credential.helper', { encoding: 'utf8' }).trim();
      if (gitConfig) {
        console.log('🔐 Found Git credential helper, but GitHub API requires a personal access token');
        console.log('Please create a GitHub personal access token and set it as GITHUB_TOKEN');
        console.log('Visit: https://github.com/settings/tokens');
        return null;
      }
    } catch (error) {
      // Git credential helper not configured
    }
    
    return null;
  }
  
  const githubToken = getGitHubToken();
  
  if (!githubToken) {
    console.error('❌ No GitHub authentication found');
    console.log('');
    console.log('🔧 To authenticate, you can:');
    console.log('1. Install GitHub CLI: brew install gh (macOS) or visit https://cli.github.com/');
    console.log('2. Login with: gh auth login');
    console.log('3. Or set a personal access token: export GITHUB_TOKEN=your_token_here');
    console.log('');
    console.log('📝 Personal access tokens can be created at: https://github.com/settings/tokens');
    process.exit(1);
  }
  
  try {
    // Parse the PR URL
    const { owner, repo, prNumber } = parsePrUrl(prUrl);
    console.log(`📍 PR: ${owner}/${repo}#${prNumber}`);
    
    // Initialize GitHub API client
    const octokit = new Octokit({
      auth: githubToken
    });
    var deprecatedVar = "using var instead of const";
    
    // Delete comments by the specified reviewer
    await deleteReviewerComments(octokit, owner, repo, prNumber, reviewerName);
    
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
}
