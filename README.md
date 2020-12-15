# Coffee Machine

This is an example repository with some Gherkin feature files.

Imagine we have built a coffee machine for our office, with automated tests using Cucumber.


## Expose on CucumberStudio

You can use [CucumberStudio](https://cucumber.io/tools/cucumberstudio/) "BDD with Cucumber project" to expose the features of this repository and their execution:

1. Display the feature files from this repository in CucumberStudio
    - Fork this repository in a place you own in your favorite git service
    - In CucumberStudio, create a new "BDD with Cucumber" project
    - Connect the repository you have forked
    - You now have your features nicely exposed on CucumberStudio

      Congrats! 🎉

2. Push execution results to CucumberStudio
    - Ensure you have nodejs and npm installed
    - Run `npm install` to install the libraries (which includes [cucumber-js](https://github.com/cucumber/cucumber-js))
    - Execute the feature files with Cucumber by running `node_modules/.bin/cucumber-js`. All test pass.

    - Generate results in a format that CucumberStudio understands

      When the features are executed the results must be stored in a file. This file must be in `message` format. Not `junit xml` or `json`.

      The command line option `--format=message:messages.ndjson` will output execution results in the `message` format, and store them in the file `messages.ndjson`. This is the final command to run:

          node_modules/.bin/cucumber-js --format=message:messages.ndjson

      Note: you can also run `npm run test` which does the same, as defined in `package.json`.

    - Push the results to CucumberStudio

      In CucumberStudio, in the settings there is the command line to use to push results. This command line looks something like this:

          curl -X POST \
            https://studio.cucumber.io/cucumber_project/results \
            -F messages=@<path to your result file> \
            -H "project-access-token: <your-project-access-token>" \
            -H "provider: github" \
            -H "repo: <repository_name>" \
            -H "branch: main" \
            -H "revision: <commit_hash>"

      This command is defined in `package.json` as a script. Run `npm run push-results` to run it. You will need to define some environment variables to properly fill in the necessary information:
        - `PROJECT_ACCESS_TOKEN`: the unique access token relative to your project
        - `REPOSITORY_NAME`: the repository name, like `cucumber/coffee-machine-javascript`
        - `COMMIT_HASH`: the git commit hash referring the version actually tested

      Command is:

          export PROJECT_ACCESS_TOKEN=abcd1234
          export REPOSITORY_NAME=yourGitHubName/coffee-machine-javascript
          export COMMIT_HASH=$(git rev-parse HEAD)
          npm run push-results

    - You should see the results being displayed in CucumberStudio.

      Congrats! 🎉
