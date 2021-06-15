// @flow

type TestCases = {[string]: () => mixed}

type Test = $ReadOnly<{|
  subject: string,
  behavior: string,
  run: () => mixed,
|}>

type TestResult = Pass | Fail

type Pass = $ReadOnly<{|
  status: "passed",
  subject: string,
  behavior: string,
|}>

type Fail = $ReadOnly<{|
  status: "failed",
  subject: string,
  behavior: string,
  error: Error,
|}>

const allTests: Array<Test> = []
export function test(subject: string, testCases: TestCases): void {
  for (let behavior of Object.keys(testCases)) {
    const run = testCases[behavior]
    allTests.push({subject, behavior, run})
  }
}

export function allTestResults(): Array<TestResult> {
  return allTests.map(t => {
    try {
      t.run()
      return {
        status: "passed",
        subject: t.subject,
        behavior: t.behavior,
      }
    } catch (error) {
      return {
        status: "failed",
        subject: t.subject,
        behavior: t.behavior,
        error,
      }
    }
  })
}

type Matcher<T> = {|
  textualize(): string,
  (actual: T): boolean,
|}

export function expect<T: Textualizable>(subject: T, matcher: Matcher<T>): void {
  if (!matcher(subject)) {
    throw Error(`expected ${String(subject)} ${matcher.textualize()}`)
  }
}

type Textualizable = string | number | boolean

export function toEqual<T: Textualizable>(expected: T): Matcher<T> {
  function matches(actual: T): boolean {
    return actual === expected
  }
  matches.textualize = () => `toEqual(${String(expected)})`
  return matches
}
