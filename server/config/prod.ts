export default {
  mongoURI: process.env.MONGO_URI as string,
  sendGridId: process.env.SEND_GRID_ID as string,
  sendGridKey: process.env.SEND_GRID_KEY as string,
  jwtTokenSecret: process.env.JWT_TOKEN_SECRET as string,
  clientURI: process.env.CLIENT_URI as string,
  S3Bucket: process.env.S3_BUCKET as string,
  AWSAccessKey: process.env.AWS_ACCESS_KEY_ID as string,
  AWSSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  AWSRegion: 'us-west-1',
  AWSFileURL: 'https://s3-us-west-1.amazonaws.com/camagru-bucket/',
};
