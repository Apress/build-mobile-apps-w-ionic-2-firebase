import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from '../../test';
import { LoadingController, ToastController, AlertController, ViewController } from 'ionic-angular';
import { SignupPage } from './signup';
import { AuthService } from '../../services/AuthService';
import { AuthServiceMock } from '../../testing/AuthServiceMock';
import { createCommonMocks } from '../../testing/CommonMock';

let fixture: ComponentFixture<SignupPage> = null;
let component: SignupPage = null;

describe('sign-up page', () => {
  beforeEach(async(() => {
    const {
      loadingControllerStub,
      toastControllerStub,
      alertControllerStub,
      viewControllerStub,
    } = createCommonMocks();

    TestUtils.beforeEachCompiler(
      [SignupPage],
      [
        {provide: LoadingController, useValue: loadingControllerStub},
        {provide: ToastController, useValue: toastControllerStub},
        {provide: AlertController, useValue: alertControllerStub},
        {provide: ViewController, useValue: viewControllerStub},
        {provide: AuthService, useClass: AuthServiceMock},
      ]
    ).then(compiled => {
      fixture = compiled.fixture;
      component = compiled.instance;
    });
  }));

  it('should handle success sign-up', async(() => {
    const authService = fixture.debugElement.injector.get(AuthService);
    const viewController = fixture.debugElement.injector.get(ViewController);
    spyOn(authService, 'create').and.returnValue(Promise.resolve(true));
    component.user.name = 'test';
    component.user.email = 'test@example.org';
    component.user.password = 'password';
    component.signUp();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(authService.create).toHaveBeenCalledTimes(1);
      expect(viewController.dismiss).toHaveBeenCalledWith(true);
    });
  }));

  it('should handle failed sign-up', async(() => {
    const authService = fixture.debugElement.injector.get(AuthService);
    const toastController = fixture.debugElement.injector.get(ToastController);
    spyOn(authService, 'create').and.returnValue(Promise.reject({}));
    component.user.name = 'test';
    component.user.email = 'test@example.org';
    component.user.password = 'password';
    component.signUp();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(authService.create).toHaveBeenCalledTimes(1);
      expect(toastController.create).toHaveBeenCalledTimes(1);
    });
  }));
});