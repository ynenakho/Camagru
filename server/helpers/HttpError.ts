export default class HttpError extends Error {
  static Messages = {
    [400]: 'Bad Request',
    [401]: 'Unauthorized',
    [402]: 'Payment Required',
    [403]: 'Forbidden',
    [404]: 'Not Found',
    [405]: 'Method Not Allowed',
    [406]: 'Not Acceptable',
    [407]: 'Proxy Authentication Required',
    [408]: 'Request Timeout',
    [409]: 'Conflict',
    [410]: 'Gone',
    [411]: 'Length Required',
    [412]: 'Precondition Failed',
    [413]: 'Payload Too Large',
    [414]: 'Uri Too Long',
    [415]: 'Unsupported Media Type',
    [416]: 'Range Not Satisfiable',
    [417]: 'Expectation Failed',
    [422]: 'Unprocessable Entity',
    [423]: 'Locked',
    [424]: 'Failed Dependency',
    [426]: 'Upgrade Required',
    [428]: 'Precondition Required',
    [429]: 'Too Many Requests',
    [431]: 'Request Header Fields Too Large',
    [451]: 'Unavailable For Legal Reasons',
    [500]: 'Internal Server Error',
    [501]: 'Not Implemented',
    [502]: 'Bad Gateway',
    [503]: 'Service Unavailable',
    [504]: 'Gateway Time-Out',
    [505]: 'Http Version Not Supported',
    [506]: 'Variant Also Negotiates',
    [507]: 'Insufficient Storage',
    [511]: 'Network Authentication Required',
  };

  static BadRequest = HttpError.createClass(400);
  static Unauthorized = HttpError.createClass(401);
  static PaymentRequired = HttpError.createClass(402);
  static Forbidden = HttpError.createClass(403);
  static NotFound = HttpError.createClass(404);
  static MethodNotAllowed = HttpError.createClass(405);
  static NotAcceptable = HttpError.createClass(406);
  static ProxyAuthenticationRequired = HttpError.createClass(407);
  static RequestTimeout = HttpError.createClass(408);
  static Conflict = HttpError.createClass(409);
  static Gone = HttpError.createClass(410);
  static LengthRequired = HttpError.createClass(411);
  static PreconditionFailed = HttpError.createClass(412);
  static PayloadTooLarge = HttpError.createClass(413);
  static RequestUriTooLong = HttpError.createClass(414);
  static UnsupportedMediaType = HttpError.createClass(415);
  static RequestedRangeNotSatisfiable = HttpError.createClass(416);
  static ExpectationFailed = HttpError.createClass(417);
  static UnprocessableEntity = HttpError.createClass(422);
  static Locked = HttpError.createClass(423);
  static FailedDependency = HttpError.createClass(424);
  static UpgradeRequired = HttpError.createClass(426);
  static PreconditionRequired = HttpError.createClass(428);
  static TooManyRequests = HttpError.createClass(429);
  static RequestHeaderFieldsTooLarge = HttpError.createClass(431);
  static UnavailableForLegalReasons = HttpError.createClass(451);
  static InternalServerError = HttpError.createClass(500);
  static NotImplemented = HttpError.createClass(501);
  static BadGateway = HttpError.createClass(502);
  static ServiceUnavailable = HttpError.createClass(503);
  static GatewayTimeout = HttpError.createClass(504);
  static HttpVersionNotSupported = HttpError.createClass(505);
  static VariantAlsoNegotiates = HttpError.createClass(506);
  static InsufficientStorage = HttpError.createClass(507);
  static NetworkAuthenticationRequired = HttpError.createClass(511);

  static createClass(status: keyof typeof HttpError.Messages) {
    return class extends HttpError {
      constructor(message?: string) {
        super(status, message);
      }
    };
  }

  static create(status: keyof typeof HttpError.Messages, message?: string) {
    return new HttpError(status, message);
  }

  constructor(
    public status: keyof typeof HttpError.Messages,
    message?: string
  ) {
    super(message || HttpError.Messages[status]);
  }
}
