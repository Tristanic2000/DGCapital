using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DGCapital_back.Data
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private AppDbContext _appDbContext;
        private IPersonRepository _person;

        public RepositoryWrapper(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public IPersonRepository Person
        {
            get
            {
                if (_person == null)
                {
                    _person = new PersonRepository(_appDbContext);
                }

                return _person;
            }
        }
    }
}
