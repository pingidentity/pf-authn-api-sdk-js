
export default class Assets {

  constructor(options) {
    this.logo = (options && options.logo) || 'https://assets.pingone.com/ux/end-user/0.29.0/images/ping-logo.svg';
  }

  toTemplateParams() {
    var result = {
      logo: this.logo,
    }
    return result
  }
}
