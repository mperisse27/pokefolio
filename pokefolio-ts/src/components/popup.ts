export class Popup {
  public line1: HTMLElement;
  public line2: HTMLElement;
  public fullLine1: string = "";
  public fullLine2: string = "";
  public lineCounter: number = 0;
  public container: HTMLElement;
  public text: string[] = [];
  public onClick: (() => void) | null = null;

  constructor() {
    this.container = document.getElementById("popup")!;
    this.line1 = document.getElementById("popup-line1")!;
    this.line2 = document.getElementById("popup-line2")!;
    this.lineCounter = 0;
  }

  /**
   * Changes the text displayed in the next popup. It should be called at the start of the popup.
   * @param text Array of text lines to be displayed
   * @param url The URL to open when the popup is clicked. If provided, the popup beco;es clickable and the second line will have a link text effect
   * @param details ID of a secondary more solid popup to open after the text is finished, to give more information.
   * @returns Boolean indicating whether the popup is finished or still continues to display text. Useful to decide if the player can move
   */
  public changeText(text: string[], url?: string, details?: string): boolean {
    if (this.lineCounter == 0) {
      this.container.classList.remove("hidden");
      this.fullLine1 = text[0] ?? "";
      this.fullLine2 = text[1] ?? "";
      this.lineCounter = 2;
      if (url) {
        this.line2.classList.add("underline", "text-blue-500");
        this.container.onclick = () => window.open(url, "_blank")?.focus();
        this.container.classList.add("cursor-pointer");
      }
      document.getElementById("overlay")?.classList.remove("select-none"); //Remove safety for Shift key
    }
    else if (this.lineCounter < text.length) {
      this.line1.textContent = this.line2.textContent;
      this.line2.textContent = "";
      this.fullLine1 = text[this.lineCounter - 1] ?? "";
      this.fullLine2 = text[this.lineCounter] ?? "";
      this.lineCounter++;
    }
    else {
      this.container.classList.add("hidden");
      this.line1.textContent = "";
      this.line2.textContent = "";
      this.fullLine1 = "";
      this.fullLine2 = "";
      this.lineCounter = 0;
      this.line2.classList.remove("underline", "text-blue-500");
      this.container.onclick = null;
      this.container.classList.remove("cursor-pointer");
      if (details) {
        document.getElementById(details)?.classList.remove("hidden");
        return false; //Make sure that player can't move while details are shown
      }
      else {
        document.getElementById("overlay")?.classList.add("select-none"); //Set safety for Shift key back, player is now free to move
      }
    }
    return this.lineCounter == 0;
  }

  /**
   * This function allows the text to be printed one character by one character.
   * It is supposed to be called every frame to have a smooth appearing text effect.
   */
  public print() {
    if ((this.line1.textContent ?? "").length < this.fullLine1.length) {
      this.line1.textContent ??= "";
      this.line1.textContent += this.fullLine1[(this.line1.textContent ?? "").length];
    }
    if ((this.line2.textContent ?? "").length < this.fullLine2.length && (this.line1.textContent ?? "").length == this.fullLine1.length) {
      this.line2.textContent ??= "";
      this.line2.textContent += this.fullLine2[(this.line2.textContent ?? "").length];
    }
  }
}