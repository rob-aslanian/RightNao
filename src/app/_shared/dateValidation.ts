import { FormGroup, ValidatorFn, AbstractControl } from "@angular/forms";

function isCorrectDate({year , month , day} , form:FormGroup){
    let date = new  Date(year , --month , day);

    if(date.getFullYear() == year && date.getMonth() == month && date.getDate() == day){
      form.get('day').setErrors(null);     
      return true;
    }

    form.get('day').setErrors({notCorrectDate:'in-valid'});
    return false;

};

function validateToDate(): ValidatorFn {
  function _getTime(year: number, month: number): number {
    return new Date(year, month).getTime();
  }

  return (control: AbstractControl): { [key: string]: any } | null => {
    let parent = control.parent;

    if (parent) {
      let startMonth = +parent.controls["startMonth"].value || 0,
        startYear = +parent.controls["startYear"].value || 0,
        endMonth = +parent.controls["endMonth"].value || 0,
        endYear = +parent.controls["endYear"].value || 0;

      let startTime = _getTime(startYear, startMonth),
        endTime = _getTime(endYear, endMonth);

      if (startTime && endTime) {
        if (startTime > endTime) {
          return { date: true };

        } else return null;

      } return null;
    }

    return null;
  };
}


export { isCorrectDate , validateToDate }