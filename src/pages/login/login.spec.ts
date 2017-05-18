import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { LoadingController, ToastController, AlertController, ViewController, ModalController } from 'ionic-angular';
import { LoginPage } from './login';
import { AuthService } from '../../services/AuthService';
import { AuthServiceMock } from '../../testing/AuthServiceMock';
import { createCommonMocks } from '../../testing/CommonMock';
import { Oauth } from 'ng2-cordova-oauth/oauth';

let fixture: ComponentFixture<LoginPage> = null;
let component: LoginPage = null;

describe('login page', () => {
  beforeEach(async(() => {
    const {
      loadingControllerStub,
      toastControllerStub,
      alertControllerStub,
      viewControllerStub,
      modalControllerStub,
    } = createCommonMocks();

    TestUtils.beforeEachCompiler(
      [LoginPage],
      [
        {provide: LoadingController, useValue: loadingControllerStub},
        {provide: ToastController, useValue: toastControllerStub},
        {provide: AlertController, useValue: alertControllerStub},
        {provide: ViewController, useValue: viewControllerStub},
        {provide: ModalController, useValue: modalControllerStub},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: Oauth, useValue: {}},
      ]
    ).then(compiled => {
      fixture = compiled.fixture;
      component = compiled.instance;
    });
  }));

  it('should handle success login', async(() => {
    const authService = fixture.debugElement.injector.get(AuthService);
    const viewController = fixture.debugElement.injector.get(ViewController);
    spyOn(authService, 'logIn').and.returnValue(Promise.resolve(true));
    component.user.email = 'test@example.org';
    component.user.password = 'password';
    component.logIn();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(authService.logIn).toHaveBeenCalledTimes(1);
      expect(viewController.dismiss).toHaveBeenCalledTimes(1);
    });
  }));

  it('should handle failed login', async(() => {
    const authService = fixture.debugElement.injector.get(AuthService);
    const toastController = fixture.debugElement.injector.get(ToastController);
    spyOn(authService, 'logIn').and.returnValue(Promise.reject(false));
    component.user.email = 'test@example.org';
    component.user.password = 'password';
    component.logIn();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(authService.logIn).toHaveBeenCalledTimes(1);
      expect(toastController.create).toHaveBeenCalledTimes(1);
    });
  }));
});