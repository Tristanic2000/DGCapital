using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DGCapital_back.Data;
using DGCapital_back.Models;

namespace DGCapital_back.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    public class PersonController : ControllerBase
    {
        private IRepositoryWrapper _repo;
        public PersonController(IRepositoryWrapper repository)
        {
            _repo = repository;
        }


        [HttpGet]
        public IActionResult Get() 
        {
            try
            {
                var people = _repo.Person.FindAll();

                if (people == null)
                    return NotFound();

                return Ok(people);
            }
            catch
            {
                return BadRequest();
            }

        }

        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            try
            {
                var person = _repo.Person.GetById(id);

                if (person == null)
                    return NotFound();

                return Ok(person);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("create")]
        public ActionResult Create(Person person)
        {
            try
            {
                _repo.Person.Create(person);
                _repo.Person.Save();
                return Created("api/person/"+person.id, person);
            }
            catch
            {
                return BadRequest("Failed to create");
            }
        }

        [HttpPut("update")]
        public ActionResult Update(Person person)
        {
            try
            {
                _repo.Person.Update(person);
                _repo.Person.Save();
                return Ok(person);
            }
            catch
            {
                return BadRequest("Failed to save");
            }
        }

        [HttpDelete("delete/{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                Person person = _repo.Person.GetById(id);

                if (person != null)
                {
                    _repo.Person.Delete(person);
                    _repo.Person.Save();
                    return Ok(person);
                }
                else
                {
                    return NotFound(id);
                }
               
            }
            catch
            {
                return BadRequest("Failed to delete");
            }
        }
    }
}
