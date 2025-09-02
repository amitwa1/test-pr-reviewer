# GitHub Comment Deletion Script

This script allows you to delete all comments from a specific reviewer on a GitHub pull request.

## Prerequisites

1. **GitHub Token**: The script will automatically use the available GitHub token from your environment:
   - `GITHUB_TOKEN` (default GitHub Actions token)
   - `GH_TOKEN` (alternative token variable)
   
   The token should have the following permissions:
   - `repo` (for private repositories)
   - `public_repo` (for public repositories)

2. **Node.js and npm**: Make sure you have Node.js installed

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Ensure you have a GitHub token available in your environment (usually automatically provided in GitHub Actions)

## Usage

Run the script with the following command:

```bash
npm run delete-comments <PR_URL> <REVIEWER_NAME>
```

### Parameters

- `PR_URL`: The full GitHub PR URL (e.g., `https://github.com/owner/repo/pull/123`)
- `REVIEWER_NAME`: The GitHub username of the reviewer whose comments you want to delete

### Example

```bash
npm run delete-comments https://github.com/myorg/myproject/pull/456 "john-doe"
```

## What the Script Does

1. **Parses the PR URL** to extract owner, repository, and PR number
2. **Fetches all comments** on the specified pull request
3. **Filters comments** by the specified reviewer name
4. **Deletes each comment** from that reviewer
5. **Provides feedback** on the deletion process

## Output

The script will show:
- 🔍 Search status
- 📝 Number of comments found
- 🗑️ Each comment deletion
- ✅ Final success message

## Error Handling

The script includes comprehensive error handling for:
- Invalid PR URLs
- Missing GitHub token
- API errors
- Permission issues

## Security Notes

- Never commit your GitHub token to version control
- Use environment variables to store sensitive information
- The token should have minimal required permissions

## Troubleshooting

### "Invalid GitHub PR URL" Error
Make sure the URL follows the format: `https://github.com/owner/repo/pull/123`

### "No GitHub token found in environment" Error
The script automatically looks for `GITHUB_TOKEN` or `GH_TOKEN` in your environment. In GitHub Actions, this is usually provided automatically. If running locally, you may need to set one:
```bash
export GITHUB_TOKEN=your_token_here
# or
export GH_TOKEN=your_token_here
```

### Permission Errors
Ensure your GitHub token has the necessary permissions for the repository you're trying to access.

## License

This script is part of the PR reviewer project and follows the same license terms.
