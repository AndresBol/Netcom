<?php

class SlaReportModel
{
    public $db;

    public function __construct()
    {
        $this->db = new MySqlConnect();
    }


    public function getResponseReport()
    {
        $sql = "
            SELECT 
                SUM(CASE WHEN first_response_sla_breached = 0 THEN 1 ELSE 0 END) AS within_sla,
                SUM(CASE WHEN first_response_sla_breached = 1 THEN 1 ELSE 0 END) AS breached_sla
            FROM ticket;
        ";

        return $this->db->ExecuteSQL($sql)[0];
    }

    public function getResolutionReport()
    {
        $sql = "
            SELECT 
                SUM(CASE WHEN resolution_sla_breached = 0 THEN 1 ELSE 0 END) AS within_sla,
                SUM(CASE WHEN resolution_sla_breached = 1 THEN 1 ELSE 0 END) AS breached_sla
            FROM ticket;
        ";

        return $this->db->ExecuteSQL($sql)[0];
    }

    public function getCategoryBreaches()
    {
        $sql = "
            SELECT 
                c.name AS category,
                COUNT(*) AS breaches
            FROM ticket t
            INNER JOIN category c ON t.category_id = c.id
            WHERE t.resolution_sla_breached = 1
            GROUP BY c.id
            ORDER BY breaches DESC;
        ";

        return $this->db->ExecuteSQL($sql);
    }
}
