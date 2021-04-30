# Workflow Team Notifications

Notifies about the workflow execution results.

## Inputs

### `notify-conclusions`

**Optional** A list of workflow conclusions (comma separated) that will result in a notification, if not provided, a notification will be sent by default. Can be one of the “success”, “failure”, “neutral”, “cancelled”, “skipped”, “timed_out”, or “action_required”.

## Example usage
```
uses: advancedcsg-open/mosaic-workflow-teams-notifications-action@v1.0
with:
  notify-conclusions: success
env:
  TEAMS_WEBHOOK: ${{secrets.TEAMS_WEBHOOK}}
```
