// feature
class FriendList {
    friends = [];

    addFriend(name) {
        this.friends.push(name);
        this.announceFriendship(name);
    }

    announceFriendship(name) {
        global.console.log(`${name} is now a friend!`);
    }

    removeFriend(name) {
        const idx = this.friends.indexOf(name);

        if (idx === -1) {
            throw new Error('Friend not found!');
        }

        this.friends.splice(idx, 1);
    }
}

// test
describe('FriendsList', () => {
    let friendList;

    beforeEach(() => {
        friendList = new FriendList();
    });

    it('initializes friends list', () => {
        expect(friendList.friends.length).toEqual(0);
    });

    it('adds a friend to the list', () => {
        friendList.addFriend('James');

        expect(friendList.friends.length).toEqual(1);
    });

    it('announces friendship', () => {
        friendList.announceFriendship = jest.fn();

        expect(friendList.announceFriendship).not.toHaveBeenCalled();
        friendList.addFriend('James');
        expect(friendList.announceFriendship).toHaveBeenCalledWith('James');
    });

    describe('removeFriend', () => {
        it('remove a friend from the list', () =>{
            friendList.addFriend('James');
            expect(friendList.friends[0]).toEqual('James');
            friendList.removeFriend('James');
            expect(friendList.friends[0]).toBeUndefined();
        });

        it('throws an error as friend does not exist', () => {
            expect(() => friendList.removeFriend('James').toThrow(new Error('Friend not found!')));
        });
    });
});