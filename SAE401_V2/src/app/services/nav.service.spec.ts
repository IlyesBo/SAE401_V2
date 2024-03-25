import { TestBed } from '@angular/core/testing';
import { NavService } from './nav.service';

describe('NavService', () => {
  let service: NavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default active state', () => {
    expect(service.getActive()).toEqual('default'); // Vérifie si l'état actif par défaut est 'default'
  });

  it('should change active state', () => {
    service.changeActive('newState');
    expect(service.getActive()).toEqual('newState'); // Vérifie si l'état actif a été correctement modifié
  });
});
