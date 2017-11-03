package com.boss.web.controller;

import com.boss.entity.vo.TbSupplier;
import com.boss.service.ITbSupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 供应商demo演示
 * @author WangBangMing
 *
 */
@Controller
@RequestMapping(value="/rest")
public class SupplierController {
	
	@Autowired
	ITbSupplierService tbSupplierService;

	@RequestMapping(value="/suppliers", method=RequestMethod.GET)
	@ResponseBody
	public List<TbSupplier> findAll() {
		return tbSupplierService.findAllTbSuppliers();
	}
	
	@RequestMapping(value="/suppliers", method=RequestMethod.POST)
	@ResponseBody
	public void saveOrUpdate(@RequestBody TbSupplier tbSupplier) {
		tbSupplierService.save(tbSupplier);
	}
	
	@RequestMapping(value="/suppliers", method=RequestMethod.DELETE)
	@ResponseBody
	public void delete(@RequestParam Long id) {
		TbSupplier tbSupplier = tbSupplierService.getViaBatis(id);
		tbSupplierService.deleteLogic(tbSupplier);
	}
}
