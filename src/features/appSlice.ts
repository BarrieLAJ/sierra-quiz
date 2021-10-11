import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
    questions: [

        {
            question: "What is 10 + 10.",
            options: ["8","20","28","30"],
            answer: "20",
            time: 30,
            points: 2
        },
        {
            question: "What is Athena's favorite animal.",
            options: ["Jellyfish","Penguins","Otters"],
            answer: "Otters",
            time: 60,
            points: 3
        },
        {
            question: "What is the Atomic number of Postasium(K)",
            options: ["18","20","19","9"],
            answer: "19",
            time: 90,
            points: 5
        },
        {
            question: "Which Element has Mass Number of 35.5",
            options:  ["Calsium-20","Oxygen-8","Postasium-19","Chlorine-17"],
            answer: "Chlorine-17",
            time: 60,
            points: 3
        }
    ],
    points: 0,
    question_number: 0,
}

const appSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers : {
        // changeTimer(state, action: PayloadAction<number>){
        //     state.time = state.questions[state.question_number].time
        // },
        addPoints(state, action: PayloadAction<number>){
            // console.log(action)
            state.points += action.payload
        },
        changeQNumber(state, action: PayloadAction<number>){
            // console.log(action)
            state.question_number =  action.payload
        }
    }
})




export const {addPoints, changeQNumber} = appSlice.actions
export default appSlice.reducer