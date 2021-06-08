export class ToggleBodyScroll {
  static enableBodyScroll(): void {
    document.querySelector('body').removeAttribute('data-disable-scroll');
  }

  static disableBodyScroll(): void {
    document
      .querySelector('body')
      .setAttribute('data-disable-scroll', 'disableScroll');
  }
}
