import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { App, MenuController, DomController, NavController, GestureController, Platform, Config, Keyboard, Form, IonicModule }  from 'ionic-angular';
import { ConfigMock, DomControllerMock, PlatformMock } from './mocks';

export class TestUtils {

  public static beforeEachCompiler(components: Array<any>, providers: Array<any> = []): Promise<{fixture: any, instance: any}> {
    return TestUtils.configureIonicTestingModule(components, providers)
      .compileComponents().then(() => {
        let fixture: any = TestBed.createComponent(components[0]);
        return {
          fixture,
          instance: fixture.componentInstance,
        };
      });
  }

  public static configureIonicTestingModule(components: Array<any>, providers: Array<any> = []): typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [
        ...components,
      ],
      providers: [
        App,
        { provide: Config, useClass: ConfigMock },
        { provide: DomController, useClass: DomControllerMock },
        Form,
        Keyboard,
        MenuController,
        NavController,
        GestureController,
        { provide: Platform, useClass: PlatformMock },
        ...providers,
      ],
      imports: [
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
      ],
    });
  }
}
