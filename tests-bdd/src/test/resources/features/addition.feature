Feature: Addition

  Scenario: Adding 2 numbers
    Given Owen is doing math
    When he enters 2 on the keypad
    Then he should see 2 appear as the result
    When he enters add on the keypad
    And he enters 4 on the keypad
    Then he should see 6 appear as the result
