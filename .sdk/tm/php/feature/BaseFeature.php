<?php
declare(strict_types=1);

// AbdoStore SDK base feature

class AbdoStoreBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(AbdoStoreContext $ctx, array $options): void {}
    public function PostConstruct(AbdoStoreContext $ctx): void {}
    public function PostConstructEntity(AbdoStoreContext $ctx): void {}
    public function SetData(AbdoStoreContext $ctx): void {}
    public function GetData(AbdoStoreContext $ctx): void {}
    public function GetMatch(AbdoStoreContext $ctx): void {}
    public function SetMatch(AbdoStoreContext $ctx): void {}
    public function PrePoint(AbdoStoreContext $ctx): void {}
    public function PreSpec(AbdoStoreContext $ctx): void {}
    public function PreRequest(AbdoStoreContext $ctx): void {}
    public function PreResponse(AbdoStoreContext $ctx): void {}
    public function PreResult(AbdoStoreContext $ctx): void {}
    public function PreDone(AbdoStoreContext $ctx): void {}
    public function PreUnexpected(AbdoStoreContext $ctx): void {}
}
