export function getOrCreateUserId(): string {
    let userId = localStorage.getItem('user_id');
    
    if (!userId) {
        // Generate a random unique user ID
        userId = crypto.randomUUID();
        localStorage.setItem('user_id', userId);
    }
    
    return userId;
}
