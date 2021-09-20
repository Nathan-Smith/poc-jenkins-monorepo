Feature: Addition

  Scenario Outline: Single Digit
    Given User is doing math
    When they enter <first_digit> on the keypad
    Then they should see <first_digit> appear as the result
    When they enter add on the keypad
    And they enter <second_digit> on the keypad
    Then they should see <second_digit> appear as the result
    When they enter equal on the keypad
    Then they should see <result> appear as the result
    Examples:
      | first_digit | second_digit | result |
      | 0           | 1            | 1      |
      | 1           | 2            | 3      |
      | 2           | 3            | 5      |
      | 3           | 4            | 7      |
      | 4           | 5            | 9      |
      | 5           | 6            | 11     |
      | 6           | 7            | 13     |
      | 7           | 8            | 15     |
      | 8           | 9            | 17     |
      | 9           | 0            | 9      |

  Scenario Outline: 2 Digits
    Given User is doing math
    When they enter <first_digit> on the keypad
    Then they should see <first_digit> appear as the result
    When they enter <second_digit> on the keypad
    Then they should see <first_digit><second_digit> appear as the result
    When they enter add on the keypad
    And they enter <third_digit> on the keypad
    Then they should see <third_digit> appear as the result
    When they enter <forth_digit> on the keypad
    Then they should see <third_digit><forth_digit> appear as the result
    When they enter equal on the keypad
    Then they should see <result> appear as the result
    Examples:
      | first_digit | second_digit | third_digit | forth_digit | result |
      | 1           | 0            | 2           | 3           | 33     |
      | 4           | 5            | 6           | 7           | 112    |
      | 8           | 9            | 1           | 2           | 101    |

  Scenario: Leading Zero
    Given User is doing math
    When they enter 0 on the keypad
    Then they should see 0 appear as the result
    When they enter 1 on the keypad
    Then they should see 1 appear as the result
