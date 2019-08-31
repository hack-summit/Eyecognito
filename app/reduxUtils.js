
const ACTION_TYPES = ['UPDATE_STUDENT_DATA', 'UPDATE_SLOTS', 'UPDATE_SEMESTER_INDEX']

const mapStateToProps = (state) => {
    return {
        student_data,
        slots,
        semester_index,
    } = state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStudentData:      (student_data) =>   { dispatch({type: ACTION_TYPES[0], data: student_data})     },
        updateSlots:            (slots) =>          { dispatch({type: ACTION_TYPES[1], data: slots})            },
        updateSemesterIndex:    (semester_index) => { dispatch({type: ACTION_TYPES[2], data: semester_index})   },
    }
}

const initialState = {
    student_data: {},
    slots: [],
    semester_index: 0,
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES[0]: return {...state, student_data: action.data, semester_index: action.data.semesters.length-1 || 0}
        case ACTION_TYPES[1]: return {...state, slots: action.data}
        case ACTION_TYPES[2]: return {...state, semester_index: action.data}
    }
    return state;
}

export { reducer, mapStateToProps, mapDispatchToProps };