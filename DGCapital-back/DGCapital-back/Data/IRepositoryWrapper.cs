using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DGCapital_back.Data
{
    public interface IRepositoryWrapper
    {
        IPersonRepository Person { get; }
    }
}
