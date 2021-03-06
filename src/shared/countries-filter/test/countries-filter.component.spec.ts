import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from 'ng2-translate';
import { Store, StoreModule } from '@ngrx/store';
import * as CountriesFilterActions from '../ngrx/countries-filter.actions';
import { countriesFilterReducer } from '../ngrx/countries-filter.reducers';

import { AppStates } from '../../../interfaces';
import { BrowserDetectionService, LanguageService, UrlChangeService, UtilsService } from '../../../common';
import { CountriesFilterComponent } from '../countries-filter.component';
import { CountriesFilterPipe } from '../countries-filter.pipe';

import {
  BrowserDetectionServiceMock,
  LanguageServiceMock,
  UrlChangeServiceMock,
  UtilsServiceMock
} from '../../../test/';

describe('CountriesFilterComponent', () => {
  let fixture: ComponentFixture<CountriesFilterComponent>;
  let component: CountriesFilterComponent;
  let store: Store<AppStates>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule,
        StoreModule.forRoot({'feature': countriesFilterReducer})
      ],
      declarations: [CountriesFilterComponent, CountriesFilterPipe],
      providers: [
        {provide: UrlChangeService, useClass: UrlChangeServiceMock},
        {provide: BrowserDetectionService, useClass: BrowserDetectionServiceMock},
        {provide: LanguageService, useClass: LanguageServiceMock},
        {provide: UtilsService, useClass: UtilsServiceMock}
      ]
    });

    fixture = TestBed.createComponent(CountriesFilterComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  }));

  it('ngOnInit(), ngOnDestroy()', () => {
    component.ngOnInit();

    expect(component.getTranslationSubscribe).toBeDefined();
    expect(component.countriesFilterStateSubscription).toBeDefined();
    expect(component.resizeSubscribe).toBeDefined();
    expect(component.orientationChange).toBeDefined();

    spyOn(component.getTranslationSubscribe, 'unsubscribe');
    spyOn(component.countriesFilterStateSubscription, 'unsubscribe');
    spyOn(component.resizeSubscribe, 'unsubscribe');
    spyOn(component.orientationChange, 'unsubscribe');

    component.ngOnDestroy();

    expect(component.getTranslationSubscribe.unsubscribe).toHaveBeenCalled();
    expect(component.countriesFilterStateSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.resizeSubscribe.unsubscribe).toHaveBeenCalled();
    expect(component.orientationChange.unsubscribe).toHaveBeenCalled();
  });

  it('calcSliceCount()', () => {
    spyOn(component.window, 'innerWidth').and.returnValue(1200);
    component.ngOnInit();

    component.isDesktop = true;

    component.calcSliceCount();

    expect(component.sliceCount).toBe(2);
  });

  it('clearAllCountries()', () => {
    component.ngOnInit();

    component.clearAllCountries();

    expect(component.showSelected).toBeTruthy();
    expect(component.regionsVisibility).toBeTruthy();
    expect(component.selectedRegions.length).toBe(0);
    expect(component.selectedCountries.length).toBe(0);
    expect(component.search).toBeFalsy(true);
  });

  it('goToLocation() -> NGRX', () => {
    component.ngOnInit();

    component.goToLocation();

    const action = new CountriesFilterActions.GetCountriesFilter('thing=Families&countries=World&regions=World');

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
