const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios')

try {
    let conclusionsString = core.getInput('notify-conclusions');
    let conclusions = conclusionsString ? conclusionsString.split(',') : null

    const workflow = github.context.payload.workflow_run

    if (conclusions == null || conclusions.includes(workflow.conclusion)) {

        let color = '808080'
        if (workflow.conclusion === 'success') color = '008000'
        if (workflow.conclusion === 'failure') color = 'FF0000'

        let message = {
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": color,
            "summary": "Workflow execution result",
            "sections": [{
                "activityTitle": `Workflow: ${workflow.name}`,
                "activitySubtitle": `Repository: ${workflow.repository.name}, branch: ${workflow.head_branch}`,
                "facts": [{
                    "name": "Conclusion",
                    "value": workflow.conclusion
                }, {
                    "name": "Time",
                    "value": workflow.created_at
                }, {
                    "name": "Last commit author",
                    "value": workflow.head_commit.author.name
                }],
                "markdown": true
            }],
            "potentialAction": [{
                "@type": "OpenUri",
                "name": "Open the workflow execution",
                "targets": [{
                    "os": "default",
                    "uri": workflow.html_url
                }]
            }]
        }
        axios
            .post(process.env.TEAMS_WEBHOOK, message)
            .then(res => {
                console.log(`statusCode: ${res.status}`)
            })
            .catch(error => {
                console.error(error)
            })
    }
} catch (error) {
    core.setFailed(error.message);
}
