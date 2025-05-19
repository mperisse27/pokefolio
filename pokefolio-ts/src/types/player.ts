class Player {
  public positionX: number;
  public positionY: number;
  public id: string;

  constructor(
    id: string,
    poistionX: number = 0,
    poistionY: number = 0
  ) {
    this.id = id;
    this.positionX = poistionX;
    this.positionY = poistionY;
  }

  public move(x: number, y: number) {
    this.positionX += x;
    this.positionY += y;
  }
}