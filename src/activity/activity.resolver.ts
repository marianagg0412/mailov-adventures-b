import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ActivityService } from './activity.service';
import { Activity } from './entities/activity.entity';
import { CreateActivityInput } from './dto/create-activity.input';
import { UpdateActivityInput } from './dto/update-activity.input';

@Resolver(() => Activity)
export class ActivityResolver {
  constructor(private readonly activityService: ActivityService) {}

  @Mutation(() => Activity)
  createActivity(@Args('createActivityInput') createActivityInput: CreateActivityInput) {
    return this.activityService.create(createActivityInput);
  }

  @Query(() => [Activity], { name: 'activities' })
  findAll() {
    return this.activityService.findAll();
  }

  @Query(() => [Activity], { name: 'activitiesForPartnership' })
  findActivitiesByPartnership(@Args('partnershipId', { type: () => Int }) partnershipId: number) {
    return this.activityService.findByPartnership(partnershipId);
  }

  @Query(() => Activity, { name: 'activity' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.activityService.findOne(id);
  }

  @Mutation(() => Activity)
  updateActivity(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateActivityInput') updateActivityInput: UpdateActivityInput) {
    return this.activityService.update(id, updateActivityInput);
  }

  @Mutation(() => Boolean)
  async removeActivity(@Args('id', { type: () => ID }) id: number) {
    await this.activityService.remove(id);
    return true;
  }
}
