import range from "lodash/range"
import styled from "@emotion/styled"
import inflection from "inflection"
import shuffle from "lodash/shuffle"

const Container = styled.div`
  width: 60rem;
  margin: 0 auto 0;
  padding: 0 1em;
  font-size: 48px;
  line-height: 1.2;
  /* font-weight: bold; */
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 8rem;
  width: 8em;
  /* margin: 2em; */
  /* padding: 0 2em; */
  /* page-break-after: always; */
`

const Question = styled.div`
  /* display: inline-block; */
  text-align: right;
  /* width: 4em; */
  height: 280px;
  @media print {
    page-break-inside: avoid;
  }
  .--top {
    padding-top: 2em;
  }
  .--bottom {
    border-bottom: 4px solid black;
    /* width: 2em; */
  }
  .--operator {
    margin-right: 0.5rem;
  }
`

function* addDoubles() {
  for (let i = 3; i < 10; i++) {
    yield `${i}+${i}`
  }
}

function* addDoublesPlus1() {
  for (let i = 3; i < 9; i++) {
    yield `${i}+${i + 1}`
    yield `${i + 1}+${i}`
  }
}

function* addDoublesPlus2() {
  for (let i = 3; i < 8; i++) {
    yield `${i}+${i + 2}`
    yield `${i + 2}+${i}`
  }
}

function* add9() {
  for (let i = 3; i < 10; i++) {
    yield `${i}+9`
  }
}

function* subtractDoubles() {
  for (let i = 3; i < 10; i++) {
    yield `${i + i}-${i}`
  }
}

function* subtractDoublesPlus1() {
  for (let i = 3; i < 9; i++) {
    yield `${i * 2 + 1}-${i}`
  }
}

function* subtractDoublesMinus1() {
  for (let i = 3; i < 9; i++) {
    yield `${i * 2 - 1}-${i}`
  }
}

function* subtractTen() {
  for (let i = 1; i <= 10; i++) {
    yield `${i + 10}-10`
  }
}

function* subtractNine() {
  for (let i = 1; i <= 10; i++) {
    yield `${i + 9}-9`
  }
}

function* add(a: number) {
  for (let i = 1; i <= 10; i++) {
    yield `${i}+${a}`
    yield `${a}+${i}`
  }
}

function* subtract(a: number) {
  for (let i = 1; i <= 10; i++) {
    yield `${i + a}-${a}`
  }
}

function* subtract1016(a: number) {
  for (let i = 10; i <= 16; i++) {
    yield `${i}-${a}`
  }
}

function* factFamily(a: number, b: number) {
  yield `${a}+${b}`
  yield `${b}+${a}`
  yield `${a + b}-${a}`
  yield `${a + b}-${b}`
}

function* addTo10() {
  for (let i = 2; i <= 9; i++) {
    yield `${i}+${10 - i}`
  }
}

function* addUp(x: number) {
  for (const a of range(x, 10)) {
    yield `${x}+${a}`
  }
}

function* addTo15() {
  yield `7+8`
  yield `8+7`
}

function* magic10() {
  for (let i = 1; i <= 10; i++) {
    yield `10-${i}`
  }
}

function* magic10friends() {
  for (let top = 11; top <= 15; top++) {
    for (let bottom = 5; bottom <= 9; bottom++) {
      yield `${top}-${bottom}`
    }
  }
}

function* multiply7() {
  for (const a of range(20, 31)) {
    yield `${a}*7`
    // yield `7*${a}`
  }
}

function exactly(generator: Generator<string> | string[], count: number) {
  const pool = [...generator]
  const result = []
  for (const i of range(0, count)) {
    const j = i % pool.length
    result.push(pool[j])
  }
  return result
}

const QUESTION_REGEXP = /^([0-9]+)([\+\-\*\/])([0-9]+)$/

const TIMES_TO_REPEAT = 1

const OP_MARKS: { [key: string]: string | undefined } = {
  "+": "+",
  "-": "-",
  "*": "×",
  "/": "÷",
}

const questions = [...subtract(7), ...subtract(8), ...subtract(9)]

const QUESTIONS = [
  // questions
  // ...exactly([...subtract(7)], 25),
  // ...exactly([...subtract(7), ...subtract(8), ...subtract(9)], 50),
  ...exactly([...subtract1016(7), ...subtract1016(8), ...subtract1016(9)], 50),
  // ...exactly([...subtract(6)], 50),
  // ...exactly(
  //   [...subtract(9), ...subtract(8), ...subtract(7), ...subtract(6)],
  //   50
  // ),
]

export default function Worksheet() {
  return (
    <>
      <$PrintedPage></$PrintedPage>
      <Container>
        <style>{`
        @page {
          margin: 20mm 10mm;
        }
      `}</style>
        <Grid>
          {range(1, TIMES_TO_REPEAT + 1).map((i) => {
            const shuffledQuestions = shuffle(QUESTIONS)
            return shuffledQuestions.map((question: string, index: number) => {
              const parts = question.match(QUESTION_REGEXP)
              if (parts == null)
                throw new Error(`Question does not fit RegExp: ${question}`)
              const opMark = OP_MARKS[parts[2]]
              return (
                <Question>
                  <div className="--top">{parts[1]}</div>
                  <div className="--bottom">
                    <span className="--operator">{opMark}</span>
                    {parts[3]}
                  </div>
                </Question>
              )
            })
          })}
        </Grid>
      </Container>
    </>
  )
}

const $PrintedPage = styled.div`
  /* position: fixed;
  top: 0em;
  bottom: 0em;
  left: 0em;
  right: 0em;
  border: 1px solid black; */
`

const $Title = styled.div`
  /* position: fixed;
  font-size: 24px;
  top: 1em;
  left: 1em;
  right: 1em;
  text-align: center; */
`
