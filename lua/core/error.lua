-- AbdoStore SDK error

local AbdoStoreError = {}
AbdoStoreError.__index = AbdoStoreError


function AbdoStoreError.new(code, msg, ctx)
  local self = setmetatable({}, AbdoStoreError)
  self.is_sdk_error = true
  self.sdk = "AbdoStore"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function AbdoStoreError:error()
  return self.msg
end


function AbdoStoreError:__tostring()
  return self.msg
end


return AbdoStoreError
