export const SET_MEMBERS_PROPS = 'SET_MEMBERS_PROPS';
export const SET_TAKEPICTURE_PROPS = 'SET_TAKEPICTURE_PROPS';
export const SET_SELECTLESION_PROPS = 'SET_SELECTLESION_PROPS';
export const SET_QUESTIONARE_PROPS = 'SET_QUESTIONARE_PROPS';
export const SET_SUMMARY_PROPS = 'SET_SUMMARY_PROPS';



export function setTakePictureProps(prop) {
  console.log("===> setQuestionareProps = ",prop);
  return ({type:SET_TAKEPICTURE_PROPS,payload:prop})
}

export function setSelectLesionProps(prop) {
  console.log("===> setQuestionareProps = ",prop);
  return ({type:SET_SELECTLESION_PROPS,payload:prop})
}

export function setQuestionareProps(prop) {
  console.log("===> setQuestionareProps = ",prop);
  return ({type:SET_QUESTIONARE_PROPS,payload:prop})
}
