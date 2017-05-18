import { Platform }  from 'ionic-angular';

export class ConfigMock {
  public get(): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}

export class DomControllerMock {
  public read(): any {}
  public write(): any {}
}

export class PlatformMock extends Platform {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }

  public registerListener(): any {}

  public getActiveElement(): any {
    return null;
  }
}
