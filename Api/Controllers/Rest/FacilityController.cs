using Api.UserFeatures.Requests;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.IRepository;
using Domain.Entities;
using Domain.Entities.Facility;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Rest
{
    public class FacilityController:BaseRestController
    {
        private readonly IGenericRepository<FacilityEntity> _facilityRepo;
        private readonly IAuthorizationServices _authorization;
        private readonly IGenericRepository<HostelEntity> _hostelRepo;

        

        public FacilityController(IGenericRepository<FacilityEntity> facilityRepo, IAuthorizationServices authorization, IGenericRepository<HostelEntity> hostelRepo)
        {
            _facilityRepo = facilityRepo;
            _authorization = authorization;
            _hostelRepo = hostelRepo;
        }

        [HttpPut("")]
        public async Task<IActionResult> CreateFacility(CreateFacilityRequest request)
        {
            bool isManagedByCurrentUser = await _authorization.IsHostelManagedByCurrentUser(request.HostelId, CurrentUserID);
            if (!isManagedByCurrentUser)
            {
                throw new ForbiddenException("User cannot access this feature!");
            }
            FacilityEntity entity = new FacilityEntity();
            Mapper.Map(request, entity);
            await _facilityRepo.CreateAsync(entity);
            return Ok();
        }
        [HttpPatch("")]
        public async Task<IActionResult> UpdateFacility(UpdateFacilityRequest request)
        {
            var facilityTarget = await _facilityRepo.FirstOrDefaultAsync(e => e.Id.Equals(request.Id));
            if (facilityTarget is null)
                throw new BadRequestException("Facility is not valid");
            bool isManagedByCurrentUser = await _authorization.IsHostelManagedByCurrentUser(facilityTarget.HostelId, CurrentUserID);
            if (!isManagedByCurrentUser)
            {
                throw new ForbiddenException("User cannot access this feature!");
            }
            Mapper.Map(request, facilityTarget);
            await _facilityRepo.UpdateAsync(facilityTarget);
            return Ok();
        }
        [HttpDelete("")]
        public async Task<IActionResult> DeleteFacility(Guid facilityId)
        {
            var facilityTarget = await _facilityRepo.FirstOrDefaultAsync(e => e.Id.Equals(facilityId));
            if (facilityTarget is null)
                throw new BadRequestException("Facility is not valid");
            bool isManagedByCurrentUser = await _authorization.IsHostelManagedByCurrentUser(facilityTarget.HostelId, CurrentUserID);
            if (!isManagedByCurrentUser)
            {
                throw new ForbiddenException("User cannot access this feature!");
            }
            facilityTarget.IsDeleted = true;
            await _facilityRepo.UpdateAsync(facilityTarget);
            return Ok();
        }
    }
}
