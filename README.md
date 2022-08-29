# synthetic-scripting

## Run Application

1. Pull the Docker image.

`docker pull logzio/synthetic-script:latest`

2. Run the Docker container.

`docker run -p 8080:8080 -d --name synthetic-script logzio/synthetic-script:latest`

Docker image will run a Node.js mini app. Open http://localhost:8080 in your Browser to access the UI that helps you establish connection between your app and Logz.io.

## Define a script for running the test

1. In tab `General Settings`, fill in all the required fields.

![UI first screen](assets/first-screen.png)

| Field                                                    | Description                                                                                                               |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Name of the Lambda (Required)                            | Lambda function name what will be created and it also will be a name of the text to represent it inside logz.io Dashboard |
| Description (Optional)                                   | Lambda function description what will be create                                                                           |
| Logz.io shipping Token (Required)                        | Your Logz.io logs shipping token.                                                                                       |
| Range time for send data to the logs (Default: 1 minute) | Define a time in a minutes to run a lambda function (using cloudBridge event)                                             |

2. On a Second tab `Aws Settings` you will see. Please fill all reqiured fields.

![UI second screen](assets/second-screen.png)

| Field                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aws Access Key (Required)             | Your AWS access key ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Aws Secret Key (Required)             | Your AWS secret key ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Bucket Name (Required)                | The bucket name to which the PUT action was initiated. When using this action with an access point, you must direct requests to the access point hostname. The access point hostname takes the form AccessPointName-AccountId.s3-accesspoint.Region.amazonaws.com. When using this action with an access point through the Amazon Web Services SDKs, you provide the access point ARN in place of the bucket name. For more information about access point ARNs, see Using access points in the Amazon S3 User Guide. |
| Aws Region (Required)                 | Your region to send service requests to.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Aws AccountId (Required)              | AWS account ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| AWS IAM Role Lambda Create (Required) | The Amazon Resource Name (ARN) of the function's execution role.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| AWS IAM Role Event Put (Required)     | Add Rule for put event to lambda function                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

2. On a Third tab `Enviroment Variables` you will see.

![UI third screen](assets/third-screen.png)

You can define here env variable that can be attach for your lambda function and you can use it in Code Editor as `process.env.KEY` where Key you can define in that section and it will be prepresent inside you lambda function

3. On A Fourth tab `Code Editor` you will see.

![UI four screen](assets/four-screen.png)

You can define code here for your test using [playwright.dev](https://playwright.dev). But please put your code specific between comments

4. After set all values and define code of test what you want to run.
   You can you can click `Test locally` if everything works you will see metrics from one your test.
   For Deploy your lambda function you can click `Deploy to the cloud`. You will see a status of all steps what is running behind. if Everything is good you need to see

![UI final screen](assets/final.png)

## Check Logz.io for your metrics

Give your metrics a few minutes to get from your system to ours,
and then open [Logz.io](https://app.logz.io/#/dashboard/metrics).

## Changelong

1.0.0:

-   Initial Release

## License

Licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.
