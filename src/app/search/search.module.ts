import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { SearchHeaderComponent } from './shared/search-header/search-header.component';
import { LeftComponent } from './shared/left/left.component';
import { SearchNameColumnComponent } from './shared/left/search-name-column/search-name-column.component';
import { SearchAgeColumnComponent } from './shared/left/search-age-column/search-age-column.component';
import { SearchGenderColumnComponent } from './shared/left/search-gender-column/search-gender-column.component';
import { SearchCountryColumnComponent } from './shared/left/search-country-column/search-country-column.component';
import { SearchCityColumnComponent } from './shared/left/search-city-column/search-city-column.component';
import { SearchLanguageColumnComponent } from './shared/left/search-language-column/search-language-column.component';
import { SearchJobTitleColumnComponent } from './shared/left/search-job-title-column/search-job-title-column.component';
import { SearchCompanyNameColumnComponent } from './shared/left/search-company-name-column/search-company-name-column.component';
import { SearchSchoolColumnComponent } from './shared/left/search-school-column/search-school-column.component';
import { SearchFeildOfStudyColumnComponent } from './shared/left/search-feild-of-study-column/search-feild-of-study-column.component';
import { SearchInterestColumnComponent } from './shared/left/search-interest-column/search-interest-column.component';
import { SearchShowOnlyColumnComponent } from './shared/left/search-show-only-column/search-show-only-column.component';
import { SearchSkillColumnComponent } from './shared/left/search-skill-column/search-skill-column.component';
import { SearchIndustryColumnComponent } from './shared/left/search-industry-column/search-industry-column.component';
import { SearchOccupationColumnComponent } from './shared/left/search-occupation-column/search-occupation-column.component';
import { SearchRaitingColumnComponent } from './shared/left/search-raiting-column/search-raiting-column.component';
import { SearchCompanySizeColumnComponent } from './shared/left/search-company-size-column/search-company-size-column.component';
import { SearchCompanyTypeColumnComponent } from './shared/left/search-company-type-column/search-company-type-column.component';
import { SearchJobOffersColumnComponent } from './shared/left/search-job-offers-column/search-job-offers-column.component';
import { SearchJobTypeColumnComponent } from './shared/left/search-job-type-column/search-job-type-column.component';
import { SearchExperienceColumnComponent } from './shared/left/search-experience-column/search-experience-column.component';
import { SearchSalaryColumnComponent } from './shared/left/search-salary-column/search-salary-column.component';
import { SearchPractiseYearColumnComponent } from './shared/left/search-practise-year-column/search-practise-year-column.component';
import { SearchShowMeColumnComponent } from './shared/left/search-show-me-column/search-show-me-column.component';
import { SearchDegreeColumnComponent } from './shared/left/search-degree-column/search-degree-column.component';
import { SearchShowCandidatesColumnComponent } from './shared/left/search-show-candidates-column/search-show-candidates-column.component';
import { SearchDatePostedColumnComponent } from './shared/left/search-date-posted-column/search-date-posted-column.component';
import { SearchShowOffersColumnComponent } from './shared/left/search-show-offers-column/search-show-offers-column.component';
import { SearchSuitableColumnComponent } from './shared/left/search-suitable-column/search-suitable-column.component';
import { MainComponent } from './shared/main/main.component';
import { SearchMainComponent } from './search-main/search-main.component';
import { SearchColumnHeaderComponent } from './shared/search-column-header/search-column-header.component';
import { SearchMainHeaderComponent } from './shared/main/search-main-header/search-main-header.component';
import { SearchDashboardComponent } from './search-dashboard/search-dashboard.component';
import { SearchPeoplesComponent } from './shared/main/search-peoples/search-peoples.component';
import { SearchCompaniesComponent } from './shared/main/search-companies/search-companies.component';
import { SearchJobsComponent } from './shared/main/search-jobs/search-jobs.component';
import { SearchCandidatesComponent } from './shared/main/search-candidates/search-candidates.component';
import { SearchMainContentComponent } from './shared/main/search-main-content/search-main-content.component';
import { SharedModule } from '../_shared/shared.module';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchKeywordsComponent } from './shared/main/search-keywords/search-keywords.component';
import { SearchKeywordComponent } from './shared/main/search-keyword/search-keyword.component';
import { SearchFilltersComponent } from './shared/main/search-fillters/search-fillters.component';
import { SearchAllTitleComponent } from './shared/main/search-all-title/search-all-title.component';
import { SearchLocationComponent } from './shared/left/search-location/search-location.component';
import { SearchDeliveryTimeComponent } from './shared/left/search-delivery-time/search-delivery-time.component';
import { SearchWorkingHoursComponent } from './shared/left/search-working-hours/search-working-hours.component';
import { SearchProjectTypeComponent } from './shared/left/search-project-type/search-project-type.component';
import { SearchServicesComponent } from './shared/main/search-services/search-services.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SearchServiceRequestComponent } from './shared/main/search-service-request/search-service-request.component';
import { SearchRealEstateComponent } from './shared/main/search-real-estate/search-real-estate.component';
import { SearchPublicationDateComponent } from './shared/left/search-publication-date/search-publication-date.component';
import { SearchRealEstateContentComponent } from './shared/left/real-estate/search-real-estate-content/search-real-estate-content.component';
import { SearchDealTypeComponent } from './shared/left/search-deal-type/search-deal-type.component';
import { SearchInputsColumnComponent } from './shared/left/search-inputs-column/search-inputs-column.component';
import { SearchCheckboxColumnComponent } from './shared/left/search-checkbox-column/search-checkbox-column.component';
import { SearchRadioColumnComponent } from './shared/left/search-radio-column/search-radio-column.component';


const DYNAMIC_COMPONENTS = [
  SearchNameColumnComponent, 
  SearchAgeColumnComponent,
  SearchGenderColumnComponent, 
  SearchCountryColumnComponent, 
  SearchCityColumnComponent, 
  SearchLanguageColumnComponent, 
  SearchJobTitleColumnComponent, 
  SearchCompanyNameColumnComponent, 
  SearchSchoolColumnComponent, 
  SearchFeildOfStudyColumnComponent, 
  SearchInterestColumnComponent, 
  SearchShowOnlyColumnComponent,
  SearchSkillColumnComponent, 
  SearchIndustryColumnComponent, 
  SearchOccupationColumnComponent, 
  SearchRaitingColumnComponent, 
  SearchCompanySizeColumnComponent, 
  SearchCompanyTypeColumnComponent, 
  SearchJobOffersColumnComponent, 
  SearchJobTypeColumnComponent, 
  SearchExperienceColumnComponent, 
  SearchSalaryColumnComponent, 
  SearchPractiseYearColumnComponent, 
  SearchShowMeColumnComponent, 
  SearchDegreeColumnComponent, 
  SearchShowCandidatesColumnComponent, 
  SearchDatePostedColumnComponent, 
  SearchShowOffersColumnComponent, 
  SearchSuitableColumnComponent, 
  SearchLocationComponent,
  SearchDeliveryTimeComponent,
  SearchWorkingHoursComponent,
  SearchProjectTypeComponent,
  SearchDealTypeComponent,
  SearchPublicationDateComponent,
  SearchRealEstateContentComponent,

]

@NgModule({
  declarations: [
    SearchComponent, 
    SearchHeaderComponent, 
    LeftComponent,
    MainComponent,
    SearchMainComponent,
    SearchColumnHeaderComponent,
    SearchMainHeaderComponent,
    SearchDashboardComponent,
    SearchPeoplesComponent,
    SearchCompaniesComponent,
    SearchJobsComponent,
    SearchCandidatesComponent,
    SearchMainContentComponent,
    SearchKeywordsComponent,
    SearchKeywordComponent,
    SearchFilltersComponent,
    SearchAllTitleComponent,
    SearchServicesComponent,
    SearchServiceRequestComponent,
    SearchRealEstateComponent,
    SearchInputsColumnComponent,
    SearchCheckboxColumnComponent,
    SearchRadioColumnComponent,
    ...DYNAMIC_COMPONENTS,

  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    SearchRoutingModule,
    NgMultiSelectDropDownModule,
    SharedModule,
  ],
  entryComponents:[ ...DYNAMIC_COMPONENTS ]
})
export class SearchModule { }
