<?php

class PasswordGenerator
{
    public function generate(int $length, bool $useUpper, bool $useLower, bool $useNumber, bool $useSpecial): string
    {
        $chars = '';
        $required = [];

        if ($useUpper) {
            $chars .= CharacterClass::UPPER;
            $required[] = CharacterClass::UPPER[random_int(0, strlen(CharacterClass::UPPER) - 1)];
        }
        if ($useLower) {
            $chars .= CharacterClass::LOWER;
            $required[] = CharacterClass::LOWER[random_int(0, strlen(CharacterClass::LOWER) - 1)];
        }
        if ($useNumber) {
            $chars .= CharacterClass::DIGIT;
            $required[] = CharacterClass::DIGIT[random_int(0, strlen(CharacterClass::DIGIT) - 1)];
        }
        if ($useSpecial) {
            $chars .= CharacterClass::SPECIAL;
            $required[] = CharacterClass::SPECIAL[random_int(0, strlen(CharacterClass::SPECIAL) - 1)];
        }

        $password = $required;

        for ($i = count($required); $i < $length; $i++) {
            $password[] = $chars[random_int(0, strlen($chars) - 1)];
        }

        shuffle($password);
        return implode('', $password);
    }
}