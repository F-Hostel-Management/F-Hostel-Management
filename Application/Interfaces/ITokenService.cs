﻿using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Application.Models;

namespace Application.Interfaces;

public interface ITokenService
{
   string GetToken(UserEntity user);
   string GenerateAssignmentToken(AssignmentPayload assignmentPayload);
   IEnumerable<Claim> DecodeAndValidateToken(string token);
}
