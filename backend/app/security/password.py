from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

def hash_password(password : str) :
    return password_hash.hash(password)

def verify_password(password : str, hash_password : str) :
    return password_hash.verify(password, hash_password)


password_hash = PasswordHash.recommended()
