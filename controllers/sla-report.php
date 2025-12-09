<?php

class SlaReport
{
    private $model;
    private $request;

    public function __construct()
    {
        $this->model = new SlaReportModel();
        $this->request = new Request();
    }

    
    public function response()
    {
        $data = $this->model->getResponseReport();
        (new Response())->toJSON($data);
    }


    public function resolution()
    {
        $data = $this->model->getResolutionReport();
        (new Response())->toJSON($data);
    }

   
    public function categoryBreaches()
    {
        $data = $this->model->getCategoryBreaches();
        (new Response())->toJSON($data);
    }
}
