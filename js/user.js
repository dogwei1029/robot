class FieldValidator {
  /**
   *
   * @param {*} inputId 得到所需要验证的文本框元素
   * @param {Function} validatorFunc 对文本框进行验证,里面的参数是文本框的value值,如果当文本框的值为空,则返回true,否则返回错误消息
   */
  constructor(inputId, validatorFunc) {
    this.input = inputId;
    this.p = this.input.nextElementSibling;
    this.input.onblur = () => {
      this.validate();
    };
    this.validatorFunc = validatorFunc;
  }
  async validate() {
    const result = await this.validatorFunc(this.input.value);
    if (result) {
      this.p.innerText = result;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }
  static async validateAll(...validators) {
    const proms = validators.map((n) => n.validate());
    const result = await Promise.all(proms);
    return result.every((n) => n);
  }
}

