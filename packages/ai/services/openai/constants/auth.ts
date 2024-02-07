export interface JWTPayload {
  /**
   * password
   */
  accessCode?: string;
  /**
   * Represents the user's API key
   *
   * If provider need multi keys like bedrock,
   * this will be used as the checker whether to use frontend key
   */
  apiKey?: string;
  /**
   * Represents the endpoint of provider
   */
  endpoint?: string;

  azureApiVersion?: string;
  useAzure?: boolean;

  awsAccessKeyId?: string;
  awsRegion?: string;
  awsSecretAccessKey?: string;
}
