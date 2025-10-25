<?php

class RequestValidator
{
    public function validate(array $params): array
    {
        $errors = [];

        $length = (int)($params['length'] ?? 12);
        if ($length < 6 || $length > 99) {
            $errors['length'] = 'Length must be between 6 and 99.';
        }

        $useUpper = $this->toBool($params['useUpperCase'] ?? true);
        $useLower = $this->toBool($params['useLowerCase'] ?? true);
        $useNumber = $this->toBool($params['useNumber'] ?? true);
        $useSpecial = $this->toBool($params['useSpecialChar'] ?? false);

        $enabledCount = ($useUpper ? 1 : 0) + ($useLower ? 1 : 0) +
                        ($useNumber ? 1 : 0) + ($useSpecial ? 1 : 0);

        if ($enabledCount === 0) {
            $errors['classes'] = 'At least one character class (checkbox) must be enabled.';
        }

        return [
            'valid' => empty($errors),
            'errors' => $errors,
            'options' => compact('length', 'useUpper', 'useLower', 'useNumber', 'useSpecial')
        ];
    }

    private function toBool($value): bool
    {
        if (is_bool($value)) return $value;
        if (is_numeric($value)) return (bool)(int)$value;
        return in_array(strtolower((string)$value), ['true', '1', 'on', 'yes']);
    }
}