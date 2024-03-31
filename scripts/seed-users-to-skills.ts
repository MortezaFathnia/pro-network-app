import {db, pool} from '@/lib/db'
import { usersToSkills } from '@/lib/schema';
import { NewUserToSkill } from '@/lib/types';

export default async function main(){
    const users=await db.query.users.findMany();
    const skills=await db.query.skills.findMany();

    for(let user of users){
        for(let skill of skills){
            if(Math.random()< .5){
                continue;
            }
            const rating=Math.floor(Math.random()*5)+1
            const NewUserToSkills:NewUserToSkill={
                userId:user.id,
                skillId:skill.id,
                rating:rating
            }
            await db.insert(usersToSkills).values(NewUserToSkills).onConflictDoNothing();
        }
    }
}


if (require.main === module) {
    main();
    pool.end();
}