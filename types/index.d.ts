declare module "@ping-identity/pf-authn-js-widget"

export interface IRedirectlessConfig {
  client_id?: string,
  response_type?: string,
  onAuthorizationSuccess: (response: Response) => void,
  onAuthorizationFailed?: (response: Response) => void,
  onAuthorizationRequest?: () => Promise<Response>,
  scopes?: string[],
  state?: string
}

export interface IOptions {
  divId: string,
  flowId?: string,
  logo?: string,
  useActionParam?: boolean,
  deviceProfileScript?: string
}

export interface IAuthnWidget {
  init(): void;
  initRedirectless(redirectlessConfig: IRedirectlessConfig): void;
  clearPendingState(): void;
}

export default class AuthnWidget implements IAuthnWidget {
  constructor(baseUrl: string, options: IOptions);
  init(): void;
  initRedirectless(redirectlessConfig: IRedirectlessConfig): void;
  clearPendingState(): void;
}