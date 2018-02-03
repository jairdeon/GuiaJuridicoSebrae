<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Frontend extends CI_Controller {



	public function index(){		
		$this->load->view('frontend/header');
		$this->load->view('frontend/index');
		$this->load->view('frontend/footer');
		$this->load->view('frontend/script_footer');
	}
	
	public function empresa($cnpj){
		function get_business_meta($business_id, $meta_name){
			return $this->db->get_where('business_meta', ['business_id' => $business_id, 'meta_name' => $meta_name])->first_row()->meta_value;        
		}
		
		$data = [
			'cnpj' => $cnpj,
			'business_data' => $this->db->get_where('business', ['cnpj' => $cnpj])->first_row(),
		];

		$this->load->view('frontend/header');
		$this->load->view('frontend/single');
		$this->load->view('frontend/footer');
		$this->load->view('frontend/script_single', $data);
	}
    
}
