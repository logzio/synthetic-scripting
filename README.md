# synthetic-scripting

Synthetic-scripting mini app to emulate and monitor a custom user experience by scripting browsers that navigate your website, take specific actions, and ensure specific elements are present. Synthetic-scripting app help to define tests( with playwright) to test custom user experience.

## Run Application

1. Pull the Docker image.

`docker pull logzio/synthetic-script:latest`

2. Run the Docker container.

`docker run -p 8080:8080 -d --name synthetic-script logzio/synthetic-script:latest`

Docker image will run a Node.js mini app. Open http://localhost:8080 in your Browser to access the UI that helps you establish connection between your app and Logz.io.

## Define a script for running the test

![UI first screen](assets/screen-edit.png)

1. Dropdown with Framework
   ![UI dropdown](assets/dropdown-framework.png)

You can choose a framework for your test code.

2. Code Editor.
   ![UI code editor](assets/code-editor.png)

Here you can define the code for your test using [playwright.dev](https://playwright.dev). Put your code between the comments.
Also on that screen you can test you script if it works properly. Have a button Test Script, it will render a status about you test.

3. Add Enviroment Variables
   ![UI env-variable](assets/env-variable.png)

Here you can define the environment variable that can be attached to your Lambda function. You can use it in the Code Editor as `process.env.KEY`. You can define the KEY parameter, which will be present in the Lambda function

To test Locally please provide all required fields and add test to `Code Editor` section.

4. In tab `Explore/deploy`, fill in all the required fields.

On that tab you will have an option to use test code in two ways, Deploy to Cloud, or Download template.

Option for Download Template
![UI env-variable](assets/screen-fill-locally.png)

Option for Deploy to cloud is contains to extra fields as Access Key and Secret Key to the Cloud.
![UI env-variable](assets/screen-fill-cloud.png)

| Field                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name of the Lambda (Required)     | Lambda function name what will be created. This name will also be used to identify the Lambda function in Logz.io Dashboard                                                                                                                                                                                                                                                                                                                                                                                                 |
| Description (Optional)            | Lambda function description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Logz.io shipping Token (Required) | Your Logz.io logs shipping token.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Schedule Rate (Default: 1 minute) | Define the range in a minutes to run a Lambda function (using cloudBridge event)                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Aws Access Key (Required)         | Your AWS access key ID. \*`Requires for Deploy to Cloud option for platform`.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Aws Secret Key (Required)         | Your AWS secret key ID.\*`Requires for Deploy to Cloud option for platform`.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Bucket Name (Required)            | The bucket name to which the PUT action is initiated. When using this action with an access point, you must direct requests to the access point hostname. The access point hostname takes the form AccessPointName-AccountId.s3-accesspoint.Region.amazonaws.com. When using this action with an access point through the Amazon Web Services SDKs, you need to provide the access point ARN instead of the bucket name. For more information about access point ARNs, see Using access points in the Amazon S3 User Guide. |
| Aws Region (Required)             | Your AWS region to send service requests to.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

6. After deploying to the Cloud you will see that screen

![UI first screen](assets/finish.png)

## Check Logz.io for your metrics

Give your metrics a few minutes to get from your system to ours,
and then open [Logz.io](https://app.logz.io/#/dashboard/metrics).

## Changelong

1.1.0:

-   Update UI
-   Initial Release

1.0.0:

-   Initial Release

## License

Licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.
