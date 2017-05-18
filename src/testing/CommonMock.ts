import { Subject } from 'rxjs';

export function createCommonMocks() {
  const loadingStub = jasmine.createSpyObj('loading', ['present', 'dismiss']);
  const toastStub = jasmine.createSpyObj('toast', ['present']);
  const alertStub = jasmine.createSpyObj('alert', ['present', 'dismiss']);
  const modalStub = jasmine.createSpyObj('modal', ['present', 'dismiss', 'onDidDismiss']);
  const openPageServiceStub = jasmine.createSpyObj('openPage', ['open']);
  const socialSharingServiceStub = jasmine.createSpyObj('socialSharing', ['share']);
  return {
    loadingControllerStub: {
      create: jasmine.createSpy('create loading').and.returnValue(loadingStub),
    },
    toastControllerStub: {
      create: jasmine.createSpy('create toast').and.returnValue(toastStub),
    },
    alertControllerStub: {
      create: jasmine.createSpy('create alert').and.returnValue(alertStub),
    },
    viewControllerStub: Object.assign(jasmine.createSpyObj('view', ['dismiss', '_setHeader', '_setIONContent', '_setIONContentRef']), {
      readReady: new Subject(),
      writeReady: new Subject(),
    }),
    modalControllerStub: {
      create: jasmine.createSpy('create modal').and.returnValue(modalStub),
    },
    openPageServiceStub,
    socialSharingServiceStub,
  };
}
