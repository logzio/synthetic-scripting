/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/cloudwatch-examples.html.
Purpose:
cloudWatchEventsClient.js is a helper function that creates an Amazon CloudWatch Events service client.
Inputs (replace in code):
-REGION
*/
// snippet-start:[cloudwatch.JavaScript.events.createclientv3]

const { EventBridgeClient } = require('@aws-sdk/client-eventbridge');
// Set the AWS Region.
// readonly accessKeyId: string;
// /**
//  * AWS secret access key
//  */
// readonly secretAccessKey: string;
const REGION = process.env.REGION; //e.g. "us-east-1"
// Create an Amazon CloudWatch service client object.
exports.cweClient = new EventBridgeClient({
    region: REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
    },
});
// snippet-end:[cloudwatch.JavaScript.events.createclientv3]
