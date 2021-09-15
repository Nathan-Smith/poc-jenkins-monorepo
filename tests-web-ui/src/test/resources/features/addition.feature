Feature: Addition

  Scenario Outline: Single Digit
    Given User is doing math
    When they enters <first_digit> on the keypad
    Then they should see <first_digit> appear as the result
    When they enters add on the keypad
    And they enters <second_digit> on the keypad
    Then they should see <second_digit> appear as the result
    When they enters equal on the keypad
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
