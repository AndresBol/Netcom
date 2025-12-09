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
          COALESCE(SUM(CASE WHEN TIMESTAMPDIFF(MINUTE, t.created_on, tl_assigned.assigned_at) <= s.response_time THEN 1 ELSE 0 END),0) AS within_sla,
          COALESCE(SUM(CASE WHEN tl_assigned.assigned_at IS NULL OR TIMESTAMPDIFF(MINUTE, t.created_on, tl_assigned.assigned_at) > s.response_time THEN 1 ELSE 0 END),0) AS breached_sla
        FROM ticket t
        LEFT JOIN sla s ON s.category_id = t.category_id AND s.priority_id = t.priority_id AND s.is_active = 1
        LEFT JOIN (
          SELECT
            ticket_id,
            MIN(CASE WHEN LOWER(description) LIKE '%pending -> assigned%' THEN date END) AS assigned_at
          FROM timeline
          GROUP BY ticket_id
        ) tl_assigned ON tl_assigned.ticket_id = t.id;
        ";

        $res = $this->db->ExecuteSQL($sql);
        return $res ? $res[0] : ['within_sla' => 0, 'breached_sla' => 0];
    }


    public function getResolutionReport()
    {
        $sql = "
        SELECT
          COALESCE(SUM(CASE WHEN t.in_progress_at IS NOT NULL AND t.resolved_at IS NOT NULL
               AND TIMESTAMPDIFF(MINUTE, t.in_progress_at, t.resolved_at) <= s.resolution_time THEN 1 ELSE 0 END),0) AS within_sla,
          COALESCE(SUM(CASE WHEN t.in_progress_at IS NULL OR t.resolved_at IS NULL
               OR TIMESTAMPDIFF(MINUTE, t.in_progress_at, t.resolved_at) > s.resolution_time THEN 1 ELSE 0 END),0) AS breached_sla
        FROM (
          SELECT
            tk.id,
            tk.category_id,
            tk.priority_id,
            MIN(CASE WHEN LOWER(tl.description) LIKE '%assigned -> in progress%' THEN tl.date END) AS in_progress_at,
            MIN(CASE WHEN LOWER(tl.description) LIKE '%in progress -> resolved%' THEN tl.date END) AS resolved_at
          FROM ticket tk
          LEFT JOIN timeline tl ON tl.ticket_id = tk.id
          GROUP BY tk.id
        ) t
        LEFT JOIN sla s ON s.category_id = t.category_id AND s.priority_id = t.priority_id AND s.is_active = 1;
        ";

        $res = $this->db->ExecuteSQL($sql);
        return $res ? $res[0] : ['within_sla' => 0, 'breached_sla' => 0];
    }


    public function getCategoryBreaches()
    {
        $sql = "
        SELECT c.name AS category, COUNT(*) AS breaches
        FROM ticket t
        INNER JOIN category c ON c.id = t.category_id
        LEFT JOIN sla s ON s.category_id = t.category_id AND s.priority_id = t.priority_id AND s.is_active = 1
        WHERE t.status_id IN (SELECT id FROM status WHERE LOWER(name) = 'resolved')
        GROUP BY c.id, c.name
        ORDER BY COUNT(*) DESC;
        ";

        $res = $this->db->ExecuteSQL($sql);
        return $res ? $res : [];
    }
}
