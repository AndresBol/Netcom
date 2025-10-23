<?php
class UserSpecialFieldModel
{
    public $enlace;
    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }
    
    /*Get all special fields for a user */
    public function getByUserId($userId) {
        try {
            $vSql = "SELECT 
                usf.id,
                usf.user_id,
                usf.special_field_id,
                sf.name as special_field_name,
                sf.category_id,
                c.name as category_name
            FROM user_special_field usf
            INNER JOIN special_field sf ON usf.special_field_id = sf.id
            LEFT JOIN category c ON sf.category_id = c.id
            WHERE usf.user_id = $userId AND usf.is_active = 1 AND sf.is_active = 1;";
            
            $vResultado = $this->enlace->ExecuteSQL($vSql);
            return $vResultado ? $vResultado : [];
        } catch (Exception $e) {
            handleException($e);
            return [];
        }
    }
    
    /*Insert special fields for a user */
    public function insertForUser($userId, $specialFieldIds) {
        try {
            if (!is_array($specialFieldIds) || empty($specialFieldIds)) {
                return [];
            }
            
            foreach ($specialFieldIds as $specialFieldId) {
                // Check if already exists and is inactive
                $checkSql = "SELECT id FROM user_special_field 
                            WHERE user_id = $userId AND special_field_id = $specialFieldId;";
                $existing = $this->enlace->ExecuteSQL($checkSql);
                
                if ($existing && count($existing) > 0) {
                    // Reactivate existing record
                    $vSql = "UPDATE user_special_field SET is_active = 1 
                            WHERE user_id = $userId AND special_field_id = $specialFieldId;";
                    $this->enlace->executeSQL_DML($vSql);
                } else {
                    // Insert new record
                    $vSql = "INSERT INTO user_special_field (user_id, special_field_id, is_active) 
                            VALUES ($userId, $specialFieldId, 1);";
                    $this->enlace->executeSQL_DML($vSql);
                }
            }
            
            return $this->getByUserId($userId);
        } catch (Exception $e) {
            handleException($e);
            return [];
        }
    }
    
    /*Update special fields for a user */
    public function updateForUser($userId, $specialFieldIds) {
        try {
            // First, deactivate all existing special fields for the user
            $vSql = "UPDATE user_special_field SET is_active = 0 WHERE user_id = $userId;";
            $this->enlace->executeSQL_DML($vSql);
            
            // Then insert/reactivate the new ones
            if (is_array($specialFieldIds) && !empty($specialFieldIds)) {
                return $this->insertForUser($userId, $specialFieldIds);
            }
            
            return [];
        } catch (Exception $e) {
            handleException($e);
            return [];
        }
    }
    
    /*Delete all special fields for a user */
    public function deleteByUserId($userId) {
        try {
            $vSql = "UPDATE user_special_field SET is_active = 0 WHERE user_id = $userId;";
            $this->enlace->executeSQL_DML($vSql);
            return true;
        } catch (Exception $e) {
            handleException($e);
            return false;
        }
    }
    
    /*Delete specific special field for a user */
    public function delete($id) {
        try {
            $vSql = "UPDATE user_special_field SET is_active = 0 WHERE id = $id;";
            $this->enlace->executeSQL_DML($vSql);
            return true;
        } catch (Exception $e) {
            handleException($e);
            return false;
        }
    }
}
